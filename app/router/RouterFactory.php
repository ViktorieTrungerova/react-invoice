<?php

namespace App;

use Nette;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;


final class RouterFactory
{
	use Nette\StaticClass;

	/**
	 * @return Nette\Application\IRouter
	 */
	public static function createRouter()
	{
		$router = new RouteList;
		$router[] = new Route('api/taxes', 'Api:getTaxes');
		$router[] = new Route('api/invoice/get/<id>', 'Api:getInvoice');
		$router[] = new Route('api/invoices', 'Api:getInvoices');
		$router[] = new Route('api/clients', 'Api:clients');
		$router[] = new Route('api/invoice/save', 'Api:saveInvoice');
		$router[] = new Route('api/invoice/remove/<id>', 'Api:removeInvoice');
		$router[] = new Route('api/invoice/update-item/<id>', 'Api:updateInvoiceItem');
		$router[] = new Route('<presenter>/<action>[/<id>]', 'Homepage:default');
		return $router;
	}
}
