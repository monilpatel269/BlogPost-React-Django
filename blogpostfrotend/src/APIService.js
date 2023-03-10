import React, { Component } from 'react'
export default class APIService {

    static UpdateArticle(article_id, auth_token, body) {
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${auth_token}`,
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static InsertArticle(auth_token, body) {
        return fetch(`http://127.0.0.1:8000/api/articles/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${auth_token}`,
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static DeleteArticle(auth_token, article_id) {
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${auth_token}`,
            }
        })
    }

    static LoginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static RegisterUser(body) {
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
}

