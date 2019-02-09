<?php

namespace App\Presenters;

use Nette;

class ApiPresenter extends Nette\Application\UI\Presenter {

	/** @var Nette\Database\Context @inject */
	public $db;

	public function actionGetTaxes() {
		$this->presenter->payload->taxes = [
			['name' => 'Osvobozeno', 'tax_percent' => 0],
			['name' => 'Snížená', 'tax_percent' => 15],
			['name' => 'Základní', 'tax_percent' => 21],
		];
		$this->presenter->sendPayload();
	}

	/**
	 * @param int $id
	 * @throws Nette\Application\AbortException
	 */
	public function actionGetInvoice($id) {
		$row = $this->db->table('invoice')
			->where('id', $id)
			->fetch();
		$data = $this->invoiceToArray($row);

		$this->presenter->payload->invoice = $data;
		$this->presenter->sendPayload();
	}


	public function actionGetInvoices() {
		$invoiceRows = $this->db->table('invoice');
		$invoicesData = [];
		foreach ($invoiceRows as $invoiceRow) {
			$invoicesData[$invoiceRow->id] = $this->invoiceToArray($invoiceRow);
		}

		$this->payload->invoices = $invoicesData;
		$this->presenter->sendPayload();
	}

	public function actionClients() {
		$clientsData = [];
		foreach ($this->db->table('client') as $clientRow) {
			$clientsData[$clientRow->id] = $clientRow->toArray();
		}
		$this->payload->clients = $clientsData;
		$this->presenter->sendPayload();
	}

	public function saveInvoice(array $data) {
		$this->db->table('invoice')
			->insert($data);
		$this->payload->success = true;
		$this->presenter->sendPayload();
	}

	public function removeInvoice($id) {
		$this->db->table('invoice_item')->where('invoice_id', $id);
		$this->db->table('invoice')->where('id', $id);
		$this->payload->success = true;
		$this->presenter->sendPayload();
	}


	public function updateInvoiceItem($id) {
		$data = $this->getParameter('data');
		$this->db->table('invoice_item')->where('id', $id)
			->update($data);
		$this->payload->success = true;
		$this->presenter->sendPayload();
	}


	private function invoiceToArray(Nette\Database\Table\ActiveRow $invoiceRow) {
		$data = $invoiceRow->toArray();
		$data['client'] = $invoiceRow->client->toArray();
		unset($data['id_client']);
		$data['items'] = [];
		foreach ($invoiceRow->related('invoice_item') as $itemRow) {
			$data['items'][$itemRow->id] = $itemRow->toArray();
		}
		return $data;
	}


}