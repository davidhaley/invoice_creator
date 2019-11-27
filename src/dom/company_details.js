import { components } from './components/fields';

export const createCompanyDetails = ({ companyDetails }) => {
    return components.create.fieldGroup({ fields: companyDetails });
}