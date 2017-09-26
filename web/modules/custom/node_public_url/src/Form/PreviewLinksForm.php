<?php

namespace Drupal\node_public_url\Form;

use Drupal\Component\Render\FormattableMarkup;
use Drupal\Component\Utility\Random;
use Drupal\Core\Access\AccessResultAllowed;
use Drupal\Core\Access\AccessResultForbidden;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\Language;
use Drupal\Core\Language\LanguageInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\PluralTranslatableMarkup;
use Drupal\Core\Url;
use Drupal\node_public_url\Storage\PathStorageInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class PreviewLinksForm.
 *
 * @package Drupal\node_public_url\Form
 */
class PreviewLinksForm extends FormBase {

  /**
   * The path storage.
   *
   * @var \Drupal\node_public_url\Storage\PathStorageInterface
   */
  protected $pathStorage;

  /**
   * An empty language object.
   *
   * @var \Drupal\Core\Language\Language
   */
  protected $emptyLanguage;

  /**
   * The node.
   *
   * @var \Drupal\node\NodeInterface
   */
  protected $node;

  /**
   * An array of existing paths.
   *
   * @var bool|\stdClass[]
   */
  protected $existingPaths;

  /**
   * {@inheritdoc}
   *
   * @throws \InvalidArgumentException
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('node_public_url.path_storage')
    );
  }

  /**
   * PreviewLinksForm constructor.
   *
   * @param \Drupal\node_public_url\Storage\PathStorageInterface $pathStorage
   *   The path storage.
   *
   * @throws \InvalidArgumentException
   */
  public function __construct(
    PathStorageInterface $pathStorage
  ) {
    $this->pathStorage = $pathStorage;

    $this->emptyLanguage = new Language();

    if (!$this->getRequest()->attributes->has('node') || NULL === $this->getRequest()->attributes->get('node')) {
      throw new \InvalidArgumentException($this->t('This does not seem to be a node route.'));
    }

    $this->node = $this->getRequest()->attributes->get('node');
    $this->existingPaths = $this->pathStorage->loadForNode($this->node->id());
  }

  /**
   * Returns a unique string identifying the form.
   *
   * @return string
   *   The unique string identifying the form.
   */
  public function getFormId() {
    return 'node_public_url_preview_links_form';
  }

  /**
   * Form constructor.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return array
   *   The form structure.
   *
   * @throws \InvalidArgumentException
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Add the original language separately.
    $defaultLanguage = $this->node->getTranslation(LanguageInterface::LANGCODE_DEFAULT)->language();
    $form['paths'][$defaultLanguage->getId()] = $this->createLanguageElement($defaultLanguage, TRUE);

    // Go through the rest of the translations,
    // and create form elements for them.
    $translations = $this->node->getTranslationLanguages(FALSE);
    foreach ($translations as $language) {
      $form['paths'][$language->getId()] = $this->createLanguageElement($language);
    }

    $form['actions']['generate'] = [
      '#type' => 'submit',
      '#name' => 'generate_button',
      '#value' => $this->t('Generate'),
      '#attributes' => [
        'class' => [
          'button',
          'button--primary',
        ],
      ],
      '#title' => $this->t('Generate preview links for the selected languages.'),
      '#title_display' => 'attribute',
    ];

    $form['actions']['remove'] = [
      '#type' => 'submit',
      '#name' => 'remove_button',
      '#value' => $this->t('Remove'),
      '#attributes' => [
        'class' => [
          'button',
          'button--red',
        ],
      ],
      '#title' => $this->t('Remove preview links from the selected languages.'),
      '#title_display' => 'attribute',
    ];

    $form['#tree'] = TRUE;

    return $form;
  }

  /**
   * Create an element for a language.
   *
   * @param \Drupal\Core\Language\LanguageInterface $language
   *   The language object.
   * @param bool $originalLanguage
   *   TRUE, if it's the original node language, FALSE otherwise.
   *
   * @return array
   *   The render array for the form element.
   */
  protected function createLanguageElement(LanguageInterface $language, $originalLanguage = FALSE) {
    $langId = $language->getId();
    $element = [];

    $checkboxTitle = $language->getName();

    if (TRUE === $originalLanguage) {
      $checkboxTitle = new FormattableMarkup('<strong>@lang (Original language)</strong>', [
        '@lang' => $language->getName(),
      ]);
    }

    $element['checkbox'] = [
      '#type' => 'checkbox',
      '#title' => $checkboxTitle,
    ];

    if (isset($this->existingPaths[$langId])) {
      $path = $this->existingPaths[$langId];

      // Generate an absolute URL without language codes.
      $url = Url::fromRoute(
        'node_public_url.preview_link',
        [
          'hash' => $path->path,
          'node' => $path->nid,
        ],
        [
          'absolute' => TRUE,
          'language' => $this->emptyLanguage,
        ]
      );

      $element['url'] = [
        '#type' => 'url',
        '#title' => $this->t('URL'),
        '#disabled' => TRUE,
        '#default_value' => $url->toString(TRUE)->getGeneratedUrl(),
        '#size' => 70,
      ];

      // @todo: Maybe add this https://www.drupal.org/project/clipboardjs
    }

    return $element;
  }

  /**
   * Form submission handler.
   *
   * Depending on the triggering element, it saves or removes the public paths.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @throws \Exception
   * @throws \InvalidArgumentException
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $triggerName = $form_state->getTriggeringElement()['#name'];

    $operationCount = 0;
    $values = $form_state->getValues();
    if (isset($values['paths'])) {
      /** @var array $paths */
      $paths = $values['paths'];
      foreach ($paths as $langCode => $path) {
        // Act only if the checkbox is checked.
        if (1 === $path['checkbox']) {
          // If the 'Generate' button was pressed, and there's no existing url..
          if ('generate_button' === $triggerName && !isset($path['url'])) {
            $rand = new Random();
            // @todo: It should be unique,
            // but we should make sure it doesn't exists in the table.
            $publicPath = $rand->name(69, TRUE);

            $this->pathStorage->save(
              $this->node->id(),
              $publicPath,
              $langCode
            );
          }
          // If the 'Remove' button was pressed, and there's an existing url..
          elseif ('remove_button' === $triggerName && isset($path['url'])) {
            $this->pathStorage->delete([
              'nid' => $this->node->id(),
              'langcode' => $langCode,
            ]);
          }

          ++$operationCount;
        }
      }
    }

    $operation = ('generate_button' === $triggerName) ? 'added' : 'removed';

    $message = new PluralTranslatableMarkup(
      $operationCount,
      '1 link has been ' . $operation . '.',
      '@count links have been ' . $operation . '.'
    );

    drupal_set_message($message->render());
  }

  /**
   * Access check for the form.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The account.
   *
   * @return \Drupal\Core\Access\AccessResultInterface
   *   The access result.
   */
  public function access(AccountInterface $account): AccessResultInterface {
    $access = new AccessResultForbidden();

    if ($account->hasPermission('access preview links form')) {
      $access = new AccessResultAllowed();
    }

    return $access;
  }

}
