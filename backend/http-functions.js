import { ok, notFound, serverError } from 'wix-http-functions';
import wixdata from 'wix-data';

export function get_users(request) {

    let PlayFabID;

    if(request.query)
    {
        PlayFabID = String(request.query.playfab_id);
    }

    let response = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

    let userQuery = wixdata.query("users");
    
    if(PlayFabID)
    {
        userQuery = userQuery.eq("playfab_id", PlayFabID);
    }

    return userQuery
        .find()
        .then(results => {
            if (results.items.length > 0) {
                response.body = {
                    "status": 200,
                    "items": results.items
                };

                return ok(response);
            }

            response.body = {
                "status": 404,
                "error": "No response object could be found with the specified filters."
            };

            return notFound(response);
        })
        .catch((error) => {
            response.body = {
                "status": 500,
                "error": error
            };

            return serverError(response);
        })
}
