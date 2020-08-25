import authService from './auth.services';
import messageService from './messages.services';

const service = {
    auth: authService,
    message: messageService
}

export default service