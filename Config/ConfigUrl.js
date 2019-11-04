export const url = {
    demo: false,
    baseUrl: `http://unisys.serviont.com/Config/mobile_app_config.json`,
    url: {
        DomainUrl: `configURLConfig/domain_config.json`,
        themeUrl: `configURLThemes/tenant/index.json`,
        ivaurl: `configURLConfig/tenant/index.json`,
        imgUrl: `configURL`,
        contactUrl: `restApiURLtenant/configuration/agentinfo`,
        outageUrl: `restApiURLtenant/outages?startdate=sDate&enddate=eDate`,
        openTicketUrl: `restApiURLtenant/incidentticket?email=emailId`,
        knowledgeBaseUrl: `restApiURLtenant/kb?username=emailId&queryString=search&type=used&limit=20`,
        creaTicketUrl: `restApiURLtenant/incidentticket`,
        authenticationUrl: `restApiURLtenant/configuration/authentication?tenantId=tenant`,
    }
 }