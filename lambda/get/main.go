package main

import (
	"context"
	"errors"
	"log"
	"strconv"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"

	"fmt"
)

type MyEvent struct {
	Id int `json:"id"`
}

type Ticket struct {
	Id         int    `json:"id"`
	TicketName string `json:"ticketName"`
	Place      string `json:"place"`
	CanTrade   bool   `json:"canTrade"`
	Expired    string `json:"expired"`
	ImgSrc     string `json:"imgSrc"`
	WebUrl     string `json:"webUrl"`
}

func HandleRequest(ctx context.Context, myInput MyEvent) (Ticket, error) {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create DynamoDB client
	svc := dynamodb.New(sess)

	tableName := "TicketDB"

	result, err := svc.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				N: aws.String(strconv.Itoa(myInput.Id)),
			},
		},
	})
	if err != nil {
		log.Fatalf("Got error calling Get Ticket: %s", err)
	}
	if result.Item == nil {
		msg := "Could not find '" + strconv.Itoa(myInput.Id) + "'"
		return Ticket{}, errors.New(msg)
	}

	ticketInfo := Ticket{}

	err = dynamodbattribute.UnmarshalMap(result.Item, &ticketInfo)
	if err != nil {
		panic(fmt.Sprintf("Failed to unmarshal TicketInfo, %v", err))
	}
	return ticketInfo, nil
}

func main() {
	lambda.Start(HandleRequest)
}
