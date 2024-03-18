export interface Ticket {
    created_at: string;
    customer: {
      created_at: string;
      email: string;
      id: string;
      name: string;
      phone: string;
      reference: string;
      updated_at: string;
    };
    description: string;
    handler: {
      created_at: string;
      department_name: string;
      email: string;
      email_verified: string;
      first_name: string;
      frontdesk: boolean;
      id: string;
      last_name: string;
      permission_type: string;
      phone_number: string | null;
      photo_location: string | null;
      reference: string;
      updated_at: string;
    };
    id: string;
    priority: string;
    reference: string;
    sla_category: string;
    status: string;
    ticket_activity: any[][]; // Define the type for this array as needed
    title: string;
    updated_at: string;
  }
  

  export interface Profile {
    id: string;
    created_at: string;
    updated_at: string;
    reference: string;
    first_name: string;
    last_name: string;
    email: string;
    photo_location: string;
    phone_number: string;
    email_verified: string;
    permission_type: string;
    department_name: string;
    frontdesk: boolean;
  }
  