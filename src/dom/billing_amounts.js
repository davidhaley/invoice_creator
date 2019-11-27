import { components } from './components/fields';

export const createBillingAmounts = ({ billingAmounts }) => {
    return components.create.fieldGroup({ fields: billingAmounts });
}