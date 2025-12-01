import { cacheLife } from 'next/cache';
import qs from 'qs';
export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL || 'http://localhost:1337';

const QUERY_HOME_PAGE = {
    populate: {
        blocks: {
            on: {
                "layout.hero-section": {
                    populate: {
                        image: {
                            fields: ["url","alternativeText"]
                        },
                        link: {
                            populate: true
                        }
                    }
                }
            }
        }
    }
}

export async function getHomePage() {
    'use cache'
    
    cacheLife({ expire: 60 })

    const query = qs.stringify(QUERY_HOME_PAGE)
    const response = await getStrapiData(`/api/home-page?${query}`)
    return response?.data
}

export async function getStrapiData(url:string) {
    try {
        const response = await fetch(`${STRAPI_BASE_URL}${url}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
}

export async function RegisterUserService (userdata: object) {
    const url = `${STRAPI_BASE_URL}/api/auth/local/register`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })

        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Error registering user: ', error)
        throw error 
    }
}

export async function LoginUserService (userdata: object) {
    const url = `${STRAPI_BASE_URL}/api/auth/local`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })

        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Error login user: ', error)
        throw error 
    }
}