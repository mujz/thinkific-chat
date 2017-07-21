package main

type Message struct {
	FromUsername string `json:"from_username"`
	ToUser       string `json:"to_username"`
	Payload      string `json:"payload"`
	Email    		 string `json:"email"`
	Username 		 string `json:"username"`
	Message  		 string `json:"message"`
}
