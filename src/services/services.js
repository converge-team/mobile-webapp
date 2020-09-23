import authService from './auth.services';
import messageService from './messages.services';
import profileService from './profile.services';

const service = {
    auth: authService,
    message: messageService,
    profile: profileService
}

export default service