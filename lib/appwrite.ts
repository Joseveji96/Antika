import {Avatars, Client, Account, OAuthProvider} from "react-native-appwrite"
import { openAuthSessionAsync } from "expo-web-browser";
import * as Linkin from "expo-linking"
export const config = {
    platform: 'com.raptor.antika',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

export const client = new Client()

client 
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform)

export const avatar = new Avatars(client)
export const account = new Account(client)

export async function login(){
    try{
        const redirectUri = Linkin.createURL('/');
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri)
        if (!response) throw new Error("Faild login");
        const browserResult = await openAuthSessionAsync(response.toString(), redirectUri);
        if(browserResult.type !== 'success') throw new Error("Login failed");
        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if(!secret || !userId) throw new Error("Failed to login");
        const session = await account.createSession(userId, secret)
        if (!session) throw new Error("Failed to create a session");

        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

export async function logout(){
    try{
        await account.deleteSession('current');
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

export async function getUser(){
    try {
        const response = await account.get();
        if(response.$id){
            const userAvatar = avatar.getInitials(response.name)
            return {
                ...response,
                avatar: userAvatar.toString(),
            }
        }
    } catch (error) {
        
    }
}

export async function getCurrentUser(){
    
}