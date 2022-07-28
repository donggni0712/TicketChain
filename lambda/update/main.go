package main

import (
	"context"
	"log"
	"strconv"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

type MyEvent struct {
	Id         int    `json:"id"`
	TicketName string `json:"ticketName"`
	Place      string `json:"place"`
	Expired    string `json:"expired"`
	ImgSrc     string `json:"imgSrc"`
	WebUrl     string `json:"webUrl"`
}

func HandleRequest(ctx context.Context, myInput MyEvent) {
	// Initialize a session that the SDK will use to load
	// credentials from the shared credentials file ~/.aws/credentials
	// and region from the shared configuration file ~/.aws/config.
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	// Create DynamoDB client
	svc := dynamodb.New(sess)
	// Update item in table Movies
	tableName := "TicketDB"

	input := &dynamodb.UpdateItemInput{
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":ticketName": {
				S: aws.String(myInput.TicketName),
			},
			":place": {
				S: aws.String(myInput.Place),
			},
			":expired": {
				S: aws.String(myInput.Expired),
			},
			":imgSrc": {
				S: aws.String(myInput.ImgSrc),
			},
			":webUrl": {
				S: aws.String(myInput.WebUrl),
			},
		},
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				N: aws.String(strconv.Itoa(myInput.Id)),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set ticketName = :ticketName, place = :place, expired = :expired, imgSrc = :imgSrc, webUrl = :webUrl"),
	}

	_, err := svc.UpdateItem(input)
	if err != nil {
		log.Fatalf("Got error calling Update Ticket: %s", err)
	}

}

func main() {
	lambda.Start(HandleRequest)
}
