/* client_id : google app client id
client_secret : google app client secret
redirect_url : google app redirect url
code : oauth code that was received */
export async function getAccessToken(code: string) {
  const client_id = Deno.env.get("CLIENT_ID") ?? '';
  const client_secret = Deno.env.get("CLIENT_SECRET") ?? '';
  const redirect_url = Deno.env.get("REDIRECT_URI") ?? '';

	const post = 'client_id=' + client_id + 
				'&redirect_uri=' + redirect_url + 
				'&client_secret=' + client_secret + 
				'&code=' + code + 
				'&grant_type=authorization_code';

	const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: post
	});

	if(response.status != 200)
		throw new Error('Error : Failed to receieve access token'); 

	const json_response = await response.json();
	const access_token = json_response['access_token'];

	return access_token;
}

/* access_token : access token */
export async function getProfileInfo(access_token: any) {
	let response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo?fields=name,email,id,picture,verified_email', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + access_token
		}
	});

	if(response.status != 200)
		throw new Error('Error : Failed to get user information'); 

	const json_response = await response.json();

	return json_response;
}