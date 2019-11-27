import { components } from './components/textarea';

export const createDescription = () => {
    return components.create.textArea({ labelText: 'Description' });
}