import { combineReducers } from 'redux';
import contact from './ContactReducer'
import createTicketReducer from './CreateTicketReducer'
import CredentialsReducer from './CredentialsReducer'
import homeReducer from './homeReducer'
import IvaReducer from './IvaReducer'
import knowledgeBaseReducer from './knowledgeBaseReducer'
import outagereducer from './OutagesReducer';
import ThemeReducer from './ThemeReducer'
import ticketingReducer from './ticketingReducer'

const rootReducer = combineReducers({
   Outages: outagereducer,
   Iva: IvaReducer,
   KnowledgeBase: knowledgeBaseReducer,
   ticketing: ticketingReducer,
   home: homeReducer,
   credentials: CredentialsReducer,
   theme: ThemeReducer,
   createTicket: createTicketReducer,
   contact: contact
});

export default rootReducer;