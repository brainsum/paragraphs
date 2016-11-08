<?php

namespace Drupal\marketo_poll\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'marketo_poll' widget.
 *
 * @FieldWidget(
 *   id = "marketo_poll",
 *   module = "marketo_poll",
 *   label = @Translation("Marketo Poll"),
 *   field_types = {
 *     "marketo_poll"
 *   }
 * )
 */
class MarketoPollWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $item = $items[$delta];
    $element['subscription_url'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Subscription Domain'),
      '#description' => 'E.g.: b2c-msm.marketo.com',
      '#default_value' => $item->subscription_url,
      '#maxlength' => 2048,
      '#required' => $element['#required'],
    );
    $element['poll_class'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Poll Class'),
      '#description' => 'E.g.: cf_w_c94d14b3839540d99d68b9451eccad30_Poll',
      '#default_value' => $item->poll_class,
      '#maxlength' => 255,
      '#required' => $element['#required'],
    );
    $element['poll_id'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Poll ID'),
      '#description' => 'E.g.: bff636a5-afe2-4e1b-839d-c7b6387e030b',
      '#default_value' => $item->poll_id,
      '#maxlength' => 255,
      '#required' => $element['#required'],
    );
    return $element;
  }

}
