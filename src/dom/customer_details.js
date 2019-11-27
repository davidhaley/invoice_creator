import { components } from './components/fields';

export const createCustomerDetails = ({ customerDetails }) => {
    return components.create.fieldGroup({ fields: customerDetails });
}