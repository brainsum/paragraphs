<?php

namespace Drupal\campaign_pages\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Controller for redirect to tieto.com.
 */
class RedirectController extends ControllerBase {

  /**
   * Redirect from front page to tieto.com for anonymous users.
   *
   * Redirect to /admin/content for others.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request.
   *
   * @throws \InvalidArgumentException
   *
   * @return array|\Drupal\Core\Routing\TrustedRedirectResponse
   *   Redirection to tieto.com or a simple markup depending on the environment
   *   and user.
   */
  public function redirectToTietoCom(Request $request) {
    // @todo: Dependency injection.
    $currentUser = \Drupal::currentUser();
    if ($currentUser->isAnonymous()) {
      return new TrustedRedirectResponse('https://www.tieto.com');
    }

    return new TrustedRedirectResponse('/admin/content');
  }

}
