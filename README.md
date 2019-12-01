# invoice_creator

## Create an invoice

Instructions:

1. Install: `npm install`
2. Run Unit-Tests: `npm run test`

  Then:

3. Dev Server: `npm run serve` and visit `localhost:8080`
or
4. Production: `npm run build`


### Features:

- Append invoice line-items to the end of the line-item list (click 'Append New Line-Item') [Tip: auto-create a new row, pressing (Tab) while focusing the last cell in the last row (note: the amount must not be empty)]:
    - Title
    - Description
    - Quantity (+ integer)
    - Cost ($/Qty) (+/-, 2 decimals)
    - Line Amount (read-only, +/- 2 decimals)
- Input a tax amount (2 decimals, default 5%)
- Delete the last line-item (click 'Delete Last Line-Item') [Tip: press (Shift + Tab) while focusing the first cell in the last row (note: the amount must be empty)]
- Invoice Description (500 characters), including a character-count progress bar
- Save the invoice (emulated) (locks input fields)
    - Share the invoice with the customer (emulated) (locks input fields)
- Receive the invoice (emulated) (locks input fields)
    - Authorize the invoice
    - Enter a purchase order
    - Sign the invoice signature pad (locks authorization and PO fields)
    - Return the invoice

### Limitations

- The From (Company), To (Customer), and invoice details (Date/Invoice No/CustomerId/Due Date) are not editable
- A fixed Canadian currency
- Saving and sharing not implemented (only emulated)

