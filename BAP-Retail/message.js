import axios from "axios";
import { context } from "./context";

//Receiving a search intent based on store name and sending a list of stores with matching names 
export async function searchProvider( {search, gps}) {

    const currentTimestamp = new Date().toISOString().slice(0, -1) + "Z";

    context.action = 'search';
    context.timestamp = currentTimestamp;

    const message = {
        intent: {
            provider: {
                descriptor: {
                    name: search, // Setting client intent to fulfill
                }
            },
            fulfillment: {
                end: {
                    location: {
                        gps: gps, // Setting current location of client
                    }
                }
            },
        },

    }

    try {
        // Calling the API to get a response from protocol-server
        const { data } = await axios.post('http://localhost:5001/search', { context, message });
        console.log(data);

        for(let i=0; i<data.responses.length; i++){
            console.log('\nResponse ',i+1,':', data.responses[i].context, data.responses[i].message);
        }

        res.status(200).json(
            {message: 'Data Fetched from Beckn Gateway', 
            data: data,
        });

    } catch (err) {
        console.log(err);
    }
};


export async function searchCatalog( {bpp_id, bpp_uri, id}) {

    const currentTimestamp = new Date().toISOString().slice(0, -1) + "Z";

    context.action = 'search';
    context.bpp_id = bpp_id;
    context.bpp_uri = bpp_uri;
    context.timestamp = currentTimestamp;

    const message = {
        intent: {
            provider: {
                id: id
            },
            fulfillment: {
                end: {
                    location: {
                        gps: gps, 
                    }
                }
            },
        },
    }

    try {
        // Calling the API to get a response from protocol-server
        const { data } = await axios.post('http://localhost:5001/search', { context, message });
        console.log(data);

        for(let i=0; i<data.responses.length; i++){
            console.log('\nResponse ',i+1,':', data.responses[i].context, data.responses[i].message);
        }

        res.status(200).json(
            {message: 'Data Fetched from Beckn Gateway', 
            data: data,
        });

    } catch (err) {
        console.log(err);
    }
};

