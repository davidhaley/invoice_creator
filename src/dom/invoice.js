import { components as fieldComponents } from './components/fields';
import { components as textAreaComponents } from './components/textarea';

export const createBillingAmounts = ({ billingAmounts }) => fieldComponents.create.fieldGroup({ fields: billingAmounts });
export const createBillingInfo = ({ billingInfo }) => fieldComponents.create.fieldGroup({ fields: billingInfo });
export const createCompanyDetails = ({ companyDetails }) => fieldComponents.create.fieldGroup({ fields: companyDetails });
export const createCustomerDetails = ({ customerDetails }) => fieldComponents.create.fieldGroup({ fields: customerDetails });
export const createDescription = ({ description }) => textAreaComponents.create.textArea({ labelText: 'Description', textContent: description });

