package main

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type MyEvent struct {
	Id         int64  `json:"id"`
	TicketName string `json:"ticketName"`
	Place      string `json:"place"`
	CanTrade   bool   `json:"canTrade"`
	Expired    string `json:"expired"`
	ImgSrc     string `json:"imgSrc"`
	WebUrl     string `json:"webUrl"`
}

type Ticket struct {
	Id         int64  `json:"id"`
	TicketName string `json:"ticketName"`
	Place      string `json:"place"`
	CanTrade   bool   `json:"canTrade"`
	Expired    string `json:"expired"`
	ImgSrc     string `json:"imgSrc"`
	WebUrl     string `json:"webUrl"`
}

func HandleRequest(ctx context.Context, myInput MyEvent) (string, error) {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create DynamoDB client
	svc := dynamodb.New(sess)

	ticket := Ticket{
		Id:         myInput.Id,
		TicketName: myInput.TicketName,
		Place:      myInput.Place,
		CanTrade:   myInput.CanTrade,
		Expired:    myInput.Expired,
		ImgSrc:     myInput.ImgSrc,
		WebUrl:     myInput.WebUrl,
	}

	av, err := dynamodbattribute.MarshalMap(ticket)
	if err != nil {
		log.Fatalf("Got error marshalling new Ticket: %s", err)
	}

	// Create item in table Movies
	tableName := "TicketDB"

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(tableName),
	}

	_, err = svc.PutItem(input)
	if err != nil {
		log.Fatalf("Got error calling PutItem: %s", err)
	}

	return fmt.Sprintln("Successfully added '" + ticket.TicketName + " to table " + tableName), nil
}

func main() {
	lambda.Start(HandleRequest)
}
