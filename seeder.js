"use server";
import { userData } from "./data";
import User from './database/user.model';
import { connectToDatabase } from './lib/mongoose';

const ImportData = async () => {
    await connectToDatabase();
    try {
        await User.deleteMany();

        // Loop through the userData array and insert each user
        for (const user of userData) {
            await User.create(user);
            console.log('user has been created')
        }
        
        console.log('data imported');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

ImportData();
