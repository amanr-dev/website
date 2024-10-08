import { getTicketByUser, getTicketContributions, getUser, isLoggedIn } from '$routes/init/helpers';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
        redirect(307, '/init/tickets');
    }

    const user = await getUser();
    const ticket = await getTicketByUser(user, fetch);

    return {
        ticket,
        user,
        streamed: {
            contributions: getTicketContributions(ticket.$id, fetch)
        }
    };
};
