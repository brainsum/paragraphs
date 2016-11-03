<?php

namespace Drupal\marketo_form\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'marketo_form' formatter.
 *
 * @FieldFormatter(
 *   id = "marketo_form",
 *   label = @Translation("Marketo Form"),
 *   field_types = {
 *     "marketo_form"
 *   }
 * )
 */
class MarketoFormFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   *
   * @todo - js library
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = array();
    $forms = [];
    foreach ($items as $delta => $item) {
      $forms[] = [
        'subscription_url' => $item->subscription_url,
        'munchkin_id' => $item->munchkin_id,
        'form_id' => $item->form_id,
      ];
    }

    $elements[] = array(
      '#theme' => 'marketo_form_field',
      '#forms' => $forms,
      '#entity' => $items->getEntity(),
    );
    return $elements;
  }

}
