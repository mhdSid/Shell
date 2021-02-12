// RCTCalendarModule.m
#import "RCTCalendarModule.h"
#import <React/RCTLog.h>

@implementation RCTCalendarModule

//RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
//{
// RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
//}
//

//RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
//location:(NSString *)location
//                  myCallback:(RCTResponseSenderBlock)callback) {
//  NSNumber *eventId = [NSNumber numberWithInt:123];
//  callback(@[[NSNull null], eventId]);
//  RCTLogInfo(@"Pretending to create an event %@ at %@", title, location);
//}


//RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title
//                  location:(NSString *)location
//                  errorCallback: (RCTResponseSenderBlock)errorCallback
//                  successCallback: (RCTResponseSenderBlock)successCallback)
//{
//  @try {
//    RCTLogInfo(@"On Success: Pretending to create an event %@ at %@", title, location);
//    NSNumber *eventId = [NSNumber numberWithInt:123];
//    successCallback(@[eventId]);
//  }
//
//  @catch ( NSException *e ) {
//    RCTLogInfo(@"On Error: Pretending to create an event %@ at %@", title, location);
//    errorCallback(@[e]);
//  }
//}

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
                 location:(NSString *)location
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
 NSNumber *eventId = [NSNumber numberWithInt:123];
 if (eventId) {
    resolve(@{@"eventId": eventId, @"title": title, @"location": location});
  } else {
    reject(@"event_failure", @"no event id returned", nil);
  }
}


RCT_EXPORT_MODULE(RCTCalendarModule);



@end
