/**
 * Author: Arkady Zelensky
 */

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// User sign up
export const signup = (params) => {
  return fetch('/auth/signup', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: myHeaders
  }).then(res => res.json())
}

// User sign in
export const signin = (params) => {

  return fetch('/auth/signin', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: myHeaders
  }).then(res => res.json())
}

// Auth. user change password
export const changePassword = (params) => {

  return fetch('/user/password/change', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: myHeaders
  }).then(res => res.json())
}

// User forgot password (send email)
export const forgotPassword = (params) => {

  return fetch('/auth/forgot', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: myHeaders
  }).then(res => res.json())
}

// User change password (from email url)
export const changeForgotPassword = (params) => {

  return fetch(window.location.href, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: myHeaders
  }).then(res => res.json())
}