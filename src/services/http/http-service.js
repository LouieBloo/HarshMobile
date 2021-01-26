import React from 'react'
import axios from 'axios';
import {api} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

var token = null;
//helper function to get complete header, will return with Bearer token if authorization is true
const getHeader = async(authorized = true) => {
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  if (authorized) {
    if(!token){
      token = await AsyncStorage.getItem('token')
    }
    header.Authorization = 'Bearer ' + token
  }
  return header;
}

const request = async (verb, endpoint, getParams, body, authorized = true) => {
  let headers = await getHeader(authorized);
  let request = {
    url: api.endpoint + endpoint,
    method: verb,
    headers: headers
  }
  if (getParams) {
    request.params = getParams;
  }
  if (body) {
    request.data = body
  }

  return axios(request).catch(async (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // For 401 status we redirect to login
      if (error.response.status === 401 && !request.url.includes('oauth/token')) {
        // This is only a temporary solution
       //localStorage.removeItem('userDetails')
        //window.location = config.logoutURL;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request: ",error.request);
      //CreateNotification("Error", "Unknown error occured. Please contact support", NotificationType.danger)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      //CreateNotification("Error", "Unknown error occured. Please contact support", NotificationType.danger)
    }
    //throw the error again so consumers of this function can handle errors individually as well
    throw (error);
  });
}

export const get = async (endpoint, getParams, body, authorized = true) => {
  return request("GET", endpoint, getParams, body, authorized)
}

export const post = async (endpoint, getParams, body, authorized = true) => {
  return request("POST", endpoint, getParams, body, authorized)
}

export const patch = async (endpoint, getParams, body, authorized = true) => {
  return request("PATCH", endpoint, getParams, body, authorized)
}

export const put = async (endpoint, getParams, body, authorized = true) => {
  return request("PUT", endpoint, getParams, body, authorized)
}

export const deletee = async (endpoint, getParams, body, authorized = true) => {
  return request("DELETE", endpoint, getParams, body, authorized)
}


//middleware that will check if a response is 401. If it is 401 it will redirect to login page
const authCheck = async (response) => {
  if (response.status === 401 && !response.url.includes('oauth/token')) {
    // This is only a temporary solution
    localStorage.removeItem('userDetails')
    window.location = config.logoutURL;
  } else {
    return response;
  }
}

  