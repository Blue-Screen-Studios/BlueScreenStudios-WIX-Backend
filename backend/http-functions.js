import { ok, notFound, serverError } from 'wix-http-functions';
import wixdata from 'wix-data';

export function get_myfirstrequest()
{
    let response = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

    response.body({
        "status": 200,
        "message": "Congrats! You made your first API request with Blue Screen Studios!"
    });

    return ok(response);
}

export function get_remoteGameFiles() {
    let response = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

    response.body = {
        "status": 200,
        "file_version": 0.1,
        "remote_files": [
            "https://f87ed1ac-f273-4895-9fd3-fddd85a827b9.usrfiles.com/archives/f87ed1_60309337055147e3810783d6d130c26c.zip",
            "https://f87ed1ac-f273-4895-9fd3-fddd85a827b9.usrfiles.com/archives/f87ed1_799e5b7488124853b1062d51af32f0c1.zip",
            "https://f87ed1ac-f273-4895-9fd3-fddd85a827b9.usrfiles.com/archives/f87ed1_682fe01909324693acc98dd11a4c3b2b.zip"        ]
    };

    return ok(response);
    
}

//#region site_members
export function get_sitemember(request) {

    let response = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

    if(!request.query)
    {
        response.body = {
            "status": 400,
            "error": "A query attribute is required for this request"
        }

        return notFound(response);
    }

    let UserID;
    UserID = String(request.query.id);

    let userQuery = wixdata.query("Members/PublicData");

    if(UserID)
    {
        userQuery = userQuery.eq("_id", UserID);
    }

    return userQuery
        .find()
        .then(results => {
            if(results.items.length > 0)
            {
                response.body = {
                    "status": 200,
                    "items": results.items
                };

                return ok(response);
            }

            response.body = {
                "status": 404,
                "error": "The query specified returned no results."
            };

            notFound(response);
        })
        .catch((error) => {
            response.body = {
                "status": 500,
                "error": error
            };

            serverError(response);
        })
}

export function get_badgeinfo(request) {
    let response = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

    return wixdata.query("Members/Badges")
        .find()
        .then(results => {
            if(results.items.length > 0)
            {
                response.body = {
                    "status": 200,
                    "items": results.items
                };

                return ok(response);
            }

            response.body = {
                "status": 404,
                "error": "The query specified returned no results."
            };

            notFound(response);

        }).catch((error) => {
            response.body = {
                "status": 500,
                "error": error
            };
        });
}
//#endregion site_members

//#region blog_posts
export function get_blogEntries(request) {
    let response = {
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    return wixdata.query("Blog/Posts")
        .find()
        .then(results => {
            if(results.items.length > 0)
            {
                let data = []

                for(const item of results.items)
                {
                    data.push(item._id) 
                }

                response.body = {
                    "status": 200,
                    "data": data
                };

                return ok(response);
            }

            response.body = {
                "status": 404,
                "error": "The query specified returned no results."
            };

            notFound(response);

        }).catch((error) => {
            response.body = {
                "status": 500,
                "error": error
            };
        });
    }

    export function get_blogEntry(request)
    {
        let response = {
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };

        if(!request.query)
        {
            response.body = {
                "status": 400,
                "error": "A query attribute is required for this request"
            }

            return notFound(response);
        }

        let PostID;
        PostID = String(request.query.id);

        let postQuery = wixdata.query("Blog/Posts");

        if(PostID)
        {
            postQuery = postQuery.eq("_id", PostID);
        }

        return postQuery
            .find()
            .then(results => {
                
                if(results.items.length > 0)
                {
                    response.body = {
                        "status": 200,
                        "data": results.items
                    };

                    return ok(response);
                }
                else
                {
                    response.body = {
                        "status": 404,
                        "error": "The query specified returned no results."
                    };

                    notFound(response);
                }

            }).catch((error) => {
                response.body = {
                    "status": 500,
                    "error": error
                };
            });
        }
//#endregion blog_posts
