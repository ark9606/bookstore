/**
 * Author: Arkady Zelensky
 */

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// Admin sign in
export const signin = (params) => {

  return fetch('/admin/auth', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: myHeaders
  }).then(res => res.json())
}