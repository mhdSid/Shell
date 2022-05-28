import React from 'react';
import invoke from 'lodash/invoke';
import {Modal, SafeAreaView, ScrollView, View, Text} from 'react-native';
import styles from './termsAndPrivacyPolicyModal.style';
import {Toolbar} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {settings} from '../../constants/Texts';

const TermsAndPrivacyPolicyModal = props => {
  const {lang} = props;
  const handleCloseModal = () => {
    invoke(props, 'onClose');
  };

  return (
    <Modal animationType="slide" onRequestClose={handleCloseModal}>
      <SafeAreaView style={styles.rootSafeAreaView}>
        <View style={styles.innerSafeAreaView}>
          <Toolbar
            style={{container: styles.toolbarContainer}}
            leftElement="arrow-back"
            centerElement={settings[lang].privacyAndTerms}
            onLeftElementPress={handleCloseModal}
          />
          <ScrollView>
            <Text>
            privacy policy
At Mwippi. (hereinafter referred to as "our group"), customers and business partners (hereinafter referred to as "customers") are based on the "privacy policy" below. We handle personal information. In addition to the "Privacy Policy", the Group may establish special privacy policies (hereinafter referred to as "Service Privacy Policy") for individual service categories (for example, "Financial Services"). In that case, the "Privacy Policy" and the Service Privacy Policy shall be applied together, and if there is a conflict between the two, the Service Privacy Policy shall prevail.
Please read the following "Privacy Policy" carefully in order to use the various services operated by our group (hereinafter collectively referred to as "this service").


1. Information to be acquired
The information acquired by the Group to achieve the purpose set forth in "4. Purpose of use of acquired information" includes the following (hereinafter (1) and (2) are collectively referred to as "acquired information". increase).
* Information that our group acquires from customers Personal information refers to the personal information stipulated in Article 2, Paragraph 1 of the Act on the Protection of Personal Information (Act No. 57 of 2003, hereinafter referred to as the "Personal Information Protection Act"). However, especially in our group, the following is treated as personal information.
    * Name, date of birth, gender, occupation, and other information that can identify a specific individual
    * Information such as address, telephone number, account information (email address and password, etc.), nickname, etc. used in connection with specific personal information
    * Credit card information
    * Hobbies, family structure, age and other personal attribute information integrated with personal information
    * Information about your identity verification
    * Names, nicknames, email addresses, Facebook IDs, birthdays, genders, profile images, friend information on Facebook, and more that you can get if you license Facebook Connect and enter your Facebook ID and password. Information registered on your Facebook page
    * Information about member stores and store openings that customers have notified the Group when applying for and using this service.
* Information acquired by our group in connection with the use of this service Regardless of whether it corresponds to personal information, we will acquire the following information regarding the use of this service.
    * Information related to the use and browsing of this service by customers, such as the content of this service used by the customer, the date and time and number of times of use, and the online behavior of the customer when using this service (this includes cookie information and access). Includes information related to usage status such as logs, terminal information used, OS information, location information, and information related to customer communication including IP address, browser information, browser language, etc.)
    * Posts, photos, videos, comments, transaction messages, ratings and other information posted or sent by the customer on this service.
    * Information about your payment status with this service


2. How to collect acquired information
Our group collects information of customers who use this service by the following methods.
* How to enter directly by yourself on this service
* How to have the customer provide the Group by e-mail, mail, document, telephone, etc. (The Group records the call when answering the call with the customer, improving the quality of the call, etc.)
* How to collect when you use or browse this service
* How to collect indirectly from business partners and third parties (this is to collect your registration information from Facebook if you allow us to use Facebook Connect and enter your Facebook ID and password. Including method)
* A method of mechanically collecting the content displayed by a third-party service with the consent of the customer.


3. Management of acquired information
Persons engaged in the business of managing and using acquired information in our group strictly manage the acquired information of customers and acquire information so that unauthorized access, loss, leakage, falsification, etc. of personal information does not occur. We will pay close attention to the handling of the product and strive for its business.


4. Purpose of use of acquired information
Our group will use the acquired information for the purpose of use notified to the customer when acquiring and collecting the acquired information, the purpose of use stipulated in the terms of use, or the following purposes.
* To contact and provide information on various matters related to this service
* To provide this service
* To simplify the information input required when registering as a user with this service
* For information linkage between this service related to customer's application
* To confirm the application for the e-mail delivery service and deliver the e-mail
* To confirm or deliver your purchase regarding this service
* To make bills, payments and confirmations regarding this service
* To send a reward for the survey etc. that cooperated
* To send prizes for the prizes you applied for
* To investigate and analyze the usage status of this service
* To improve / improve the content of this service or to develop a new service
* For credit judgment and credit management related to this service
* To customize the content of this service according to the customer
* To investigate satisfaction with this service
* To aggregate the information obtained by statistically processing the acquired information and publish it as a survey result.
* To conduct research and development on this service and new services
* For use in marketing, such as delivering information and notifications about this service, new services, and other various services.
* To request cooperation in the survey, participate in various events, and report the results.
* For the delivery or display of advertisements of our group and third parties
* To distribute or display product information within services provided by our group or third parties
* To solve problems in operating this service
* To prevent unauthorized use and ensure safety of this service


5. Provision of acquired information to a third party
Our group will provide the acquired information to a third party in the following cases.

* In the case of providing information on this service that our group deems necessary to provide this service, the customer uses the information of other customers provided in accordance with the terms of use of this service. It shall be used only to the extent necessary for the service, and the information of other customers shall not be provided to a third party without the prior consent of each customer. In addition, the acquired information will be disclosed on this service for the period specified by our group.
* When our group deems it necessary for the operation and provision of services
* Payment agents, outsourced companies, and other third parties for payment, response to customer inquiries, inquiries from our group to customers, provision of related after-sales services, etc. When providing to a person
* When requested by a court, administrative agency, regulatory agency or other public institution to provide acquired information based on laws and regulations
* When the Group determines that it is necessary to provide information in order to resolve disputes with third parties or to protect the rights and interests of users of this service or third parties.
* When providing to a third party outsourced such investigation / analysis by our group in order to investigate / analyze the usage status of this service
* When providing to a third party for the distribution or display of advertisements of our group or a third party
* When providing to a third party in order to distribute or display product information within the service provided by our group or a third party
* When providing to academic research institutes for academic research purposes
* In order to detect fraudulent use and prevent fraudulent use by the credit card issuing company, the customer's listing and purchase history, information registered when using this service, usage status of this service, etc. are displayed by the customer. When providing to the card issuer you are using

In addition, if the Group determines that it is necessary to provide the acquired information, we may provide the acquired information with the consent of the customer.


6. Entrusting the handling of acquired information to a third party
The Group may outsource all or part of the handling of acquired information to a subcontractor to the extent necessary to achieve "4. Purpose of use of acquired information". At that time, we will thoroughly examine whether the person meets the contractor selection criteria set by our group, and ensure that the acquired information is properly managed when making a contract.


7. Shared use of acquired information
Our group will share the acquired information among our group companies to the extent necessary to achieve "4. Purpose of use of acquired information".

* Information to be used jointly Information to be acquired as specified in "1. Information to be acquired"
* Scope of joint users Our group stipulated in the preamble of "Privacy Policy"
*  To achieve "4. Purpose of use of acquired information"
* Manager of shared use Mwippi  Co. , Ltd.


8. Use of "cookies" etc.
You can set whether to allow the use of cookies. Many web browsers automatically allow the use of cookies, but you can change your browser settings to prohibit the use of cookies.

* If you prohibit the use of cookies, you may not be able to use this service normally, or you may not be able to reflect the advertising settings that require cookies.
* Our group automatically receives information such as your cookie information, advertisements / pages viewed, your environment, etc. from your browser, records it on the server, and automatically inputs your e-mail address when logging in to this service. We will use it to improve the convenience of such services, to maintain and protect sessions, to consider new services, and to make the content of services and advertisements more suitable for our customers.
* Please see our cookie policy for details regarding the use of cookies.


9. About Google Analytics
Our group uses Google Analytics provided by Google Inc. on this service in order to investigate and analyze the usage status of this service. Please see the Google Analytics site for an explanation of the terms of use of Google Analytics, and the company's site for an explanation of Google's privacy policy.
Google Analytics Terms of Service: https://www.google.com/analytics/terms/jp.html Google Privacy Policy: http://www.google.com/intl/ja/policies/privacy/
Google Analytics keeps track of your usage status through mechanisms such as cookies. If you do not want your data to be used in Google Analytics, please use Google Analytics opt-out his add-on provided by Google.
Google Analytics opt-out add-on: https://tools.google.com/dlpage/gaoptout?hl=ja


10. Use of "log" and "device information", etc.
* Log Our group collects IP addresses, browser types, browser languages, etc. that are automatically generated when users visit this service. This information is used to analyze the user environment and to provide better service and to prevent fraudulent activities that interfere with normal service provision. Records related to searches are stored and managed in a form that cannot identify individuals, and are used for statistical data creation and other purposes.
* Device information Our group may collect device information such as individual identification information of terminals. We will use this information to provide better service and to prevent fraudulent activities that interfere with normal service provision.


11. Correction of personal information by our group
If there is a change in personal information such as the name and postal code of a municipality, the name of a financial institution, or the expiration date of a credit card, which may interfere with the delivery or request of products, our group May change the registered personal information.


12. Personal information management and security
Our group will safely store the collected information on a server in an environment that is inaccessible to general users, and will endeavor to prevent unauthorized access, loss, destruction, falsification or leakage.


13. Information for minors
If the customer is a minor, parents, guardians or guardians agree to the contents of the "privacy policy" and terms of use, and the customer uses this service based on the "privacy policy" and terms of use. Comprehensive consent is required for your consent.


14. Improvements and updates to the "Privacy Policy"
Our group will make appropriate improvements regarding the "Privacy Policy".

* The "Privacy Policy" may be revised depending on the response to changes in laws and regulations and business needs. Our group shall notify the customer when the "Privacy Policy" is changed.
* Please be sure to check the latest "Privacy Policy" before accessing this service or using the services of our group.


15. Procedures for disclosure, correction, suspension of use, etc. of personal information
You can check and correct your registered information on this service at any time.
When requesting the disclosure of personal information that cannot be confirmed on this service, the customer can request the disclosure according to the procedure separately set by the group, except in the following cases.

* When there is a risk of harming the life, body, property or other rights and interests of the person or a third party by disclosing it
* When disclosure may significantly hinder the proper implementation of the Group's business.
* When disclosure violates the law
* When it cannot be confirmed that the request for disclosure is from the person himself / herself
As a result of disclosure, if the customer determines that the content of the personal information held by our group is not true, we can request correction, addition or deletion of personal information according to the procedure separately set by our group. In that case, our group will investigate without delay within the range necessary to achieve the purpose of use, and based on the result, we will correct, add or delete the personal information.
If you are requested to disclose personal information that cannot be confirmed on this service, we may charge a disclosure fee according to the procedure separately set by our group.


16. Contact us
For inquiries regarding the "Privacy Policy", please contact the following staff of our group.
mwippi-app@mwippi.com


Financial Services Privacy Policy
The Group handles customer information in the business of issuing prepaid payment methods provided by the Group, payment services such as fund transfer business, and other financial-related businesses (hereinafter referred to as the "Financial Services") as follows. ..
This policy is combined with the "Privacy Policy" (hereinafter referred to as "Common Policy") separately defined by Mwippi (including other consolidated subsidiaries, hereinafter referred to as "our group"). In the event of a conflict between the two, this policy shall prevail.

1. Definition of terms
The terms used in this policy shall have the meanings defined in the common policy, except as defined individually in this policy.


2. Information to be acquired
Regardless of "1. Information to be acquired" in the common policy, the Group will acquire information including personal information in the Financial Services as follows (hereinafter (1) and (2) are combined to "Acquired information". "will do).
* Information that our group obtains from customersName, date of birth, gender, occupation and other information that can identify a specific individual b. Information such as address, telephone number, account information (email address and password, etc.), nickname, etc. used in connection with specific personal information c. Credit card information d. Information about bank accounts e. Hobbies, family structure, age and other personal attribute information integrated with personal information f. Information on official certificates such as driver's licenses and resident's cards provided for customer identification, transaction purpose g. Your name, nickname, email address, Facebook ID, birthday, gender, profile picture, friend information on Facebook that you can get if you license to use Facebook Connect and enter your Facebook ID and password. , Other information registered on your Facebook page h. All other information provided by the customer to the Group in connection with the provision of the Financial Services, etc. 
* Information acquired by the Group in connection with the use of the Financial Services. Information related to the use and browsing of the Service by the customer, such as the content of the Service used by the customer, the date and time and number of times of use, and the online behavior of the customer when using the service (this includes cookie information). , Information related to usage status such as access logs, terminal information used, OS information, location information, and information related to customer communication including IP address, browser information, browser language, etc.) j. Information on remittance points, paid points or free points issuance, purchase, acquisition, payment use, withdrawal, extinction, balance and other points k. Information on the use and payment status of advance payment payments l. In addition to the items listed in the previous two items (j and k), information on transactions and payments at Mwippi services or point member stores (including information on purchased products and stores (including Mwippi sellers)). m. Other information regarding the usage status of the Financial Services 

3. Purpose of use of acquired information
Our group has acquired the above 2. We will use the acquired information described for the following purposes regardless of "4. Purpose of use of acquired information" in the common policy.
purpose of use	Information in 2. above to be used
(1) Provision of this service
	.	To register customer information and open an account regarding this service
	.	To execute transactions related to the purchase of customers' goods and services using this service
	.	For billing when purchasing products or using paid services
	.	For credit judgment and credit management
	.	To customize this service to suit you
	.	Others To enable customers to use this service smoothly	a ~ m
(2) Advertising, marketing
	.	For notification of information related to this service and other advertising information from our group, and advertising information for which our company is entrusted with advertising by a business operator other than our group as an advertiser.
	.	To conduct a questionnaire about our group or businesses other than our group
	.	For other advertising and marketing	a, b, e, g, h, i, j ~ m
(3) Improvement of service level, research and development
	.	To analyze the usage status of this service and create statistical data related to the use of this service.
	.	To improve the service level of this service
	.	To plan and provide new plans for this service in the future
	.	To improve other service levels and conduct research and development	a, e, g, h, i, j ~ m
(4) Ensuring safety
	.	To prevent unauthorized use
	.	For data management of customer information and ensuring data security
	.	To implement other measures necessary to ensure safety	a ~ m
(5) Contacting customers, responding to inquiries, etc.
	.	To send materials related to this service
	.	For lottery of campaigns and shipping of prizes and prizes
	.	To deliver information and notifications about new services, etc.
	.	To provide general information such as distribution of e-mail newsletters
	.	To verify your identity when using this service and when making inquiries
	.	To respond to customer inquiries and provide other customer support
	.	To contact you as necessary, such as other important notices regarding this service.	a ~ d, f ~ h, i ~ m


4. Provision of acquired information to a third party
Regardless of "5. Provision of acquired information to a third party" in the common policy, the Group will provide the acquired information to a third party in the following cases.
* In the case of providing information on this service that our group deems necessary to provide this service, the customer uses the information of other customers provided in accordance with the terms of use of this service. It shall be used only to the extent necessary for the service, and the information of other customers shall not be provided to a third party without the prior consent of each customer. In addition, the acquired information will be disclosed on this service for the period specified by our group.
* When our group deems it necessary for the operation and provision of services
* Delivery companies, payment agents, outsourced companies, and other third parties for product delivery, payment, response to customer inquiries, inquiries from our group to customers, provision of related after-sales services, etc. When providing to a person
* When requested by a court, administrative agency, regulatory agency or other public institution to provide acquired information based on laws and regulations
* When the Group determines that it is necessary to provide information in order to resolve disputes with third parties or to protect the rights and interests of users of this service or third parties.
* When providing to a third party outsourced such investigation / analysis by our group in order to investigate / analyze the usage status of this service
* When providing to a third party for the distribution or display of advertisements of our group or a third party
* When the Group provides the information necessary for the customer to use the external service operated by the third party to the third party with the consent of the customer.
* When the Group provides financial institutions, etc. with information on customer's receivables necessary for the purpose of financing and liquidating receivables of the Group.
* In addition, when the Group determines that it is necessary to provide the acquired information and obtains the consent of the customer.


5. Outsourcing to a third party regarding the handling of acquired information
The Group may outsource all or part of the handling of acquired information to a subcontractor to the extent necessary to achieve "3. Purpose of use of acquired information". At that time, we will thoroughly examine whether the person meets the contractor selection criteria for the Financial Services set by the Group, and ensure that the acquired information is properly managed when making a contract.

            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

TermsAndPrivacyPolicyModal.propTypes = {
  onClose: PropTypes.func,
  lang: PropTypes.string,
};

export default TermsAndPrivacyPolicyModal;
