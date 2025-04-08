

import { createUser, signInUser } from "@/actions/user.actions";


jest.mock('axios', () => ({
    post: jest.fn((url: string, data: any) => {
        if (url === `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users`) {
            return Promise.resolve({
                status: 201,
                data: {
                    user: { username: data.username },
                    token: 'mock-token',
                },
            });
        } else if (url === `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/sessions`) {
            return Promise.resolve({
                status: 200,
                data: {
                    user: { username: data.username },
                    token: 'mock-token',
                },
            });
        }
        return Promise.reject(new Error('Invalid URL'));
    }
    ),
}));




describe('User Actions', () => {
    it('should create a user and sign in successfully', async () => {
        const username = 'testuser';
        const password = 'testpassword';

        const createUserResponse = await createUser(username, password);
        expect(createUserResponse).toEqual({
            user: { username },
            token: 'mock-token',
        });

        const signInResponse = await signInUser(username, password);
        expect(signInResponse).toEqual({
            user: { username },
            token: 'mock-token',
        });
    });



});


