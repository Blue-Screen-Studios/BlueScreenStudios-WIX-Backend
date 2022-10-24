import { ok, notFound, serverError } from 'wix-http-functions';
import wixdata from 'wix-data';

export function get_users(request) {
    
    let options = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

    return wixdata.query("users")
        .find()
        .then(results => {
            if(results.items.length > 0) {
                options.body = {
                    "items": results.items
                }

                return ok(options);
            }
        })
}
