import { components } from './components/fields';

export const createBillingInfo = ({ billingInfo }) => {
    return components.create.fieldGroup({ fields: billingInfo });
}