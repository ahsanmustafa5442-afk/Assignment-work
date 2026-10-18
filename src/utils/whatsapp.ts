export interface InquiryPayload {
  clientName: string;
  email?: string;
  service: string;
  topic: string;
  wordCount?: string;
  deadline: string;
  budgetPKR?: string;
  instructions: string;
}

export function generateWhatsAppInquiryUrl(phoneIntl: string, payload: InquiryPayload): string {
  const lines: string[] = [
    `Hello Kashaf Mustafa, I visited your academic writing portfolio website and would like to inquire about assignment assistance.`,
    ``,
    `*Client Name:* ${payload.clientName}`,
  ];

  if (payload.email) {
    lines.push(`*Email:* ${payload.email}`);
  }

  lines.push(`*Service Required:* ${payload.service}`);
  lines.push(`*Assignment Topic / Subject:* ${payload.topic}`);

  if (payload.wordCount) {
    lines.push(`*Approximate Word Count:* ${payload.wordCount}`);
  }

  lines.push(`*Deadline:* ${payload.deadline}`);

  if (payload.budgetPKR) {
    lines.push(`*Target Budget:* PKR ${payload.budgetPKR}`);
  }

  lines.push(``);
  lines.push(`*Project Instructions & Details:*`);
  lines.push(payload.instructions);
  lines.push(``);
  lines.push(`Could you please review these details and provide availability and a formal quotation? Thank you.`);

  const fullMessage = lines.join('\n');
  const encodedMessage = encodeURIComponent(fullMessage);
  const cleanPhone = phoneIntl.replace(/[^0-9]/g, '');

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function generateDirectWhatsAppUrl(phoneIntl: string, customText?: string): string {
  const cleanPhone = phoneIntl.replace(/[^0-9]/g, '');
  const message = customText 
    ? encodeURIComponent(customText)
    : encodeURIComponent("Hello Kashaf Mustafa, I am interested in your academic writing and assignment support services. Could you please provide more information?");
  
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

export function generateEmailUrl(email: string, subject?: string, body?: string): string {
  const sub = encodeURIComponent(subject || "Inquiry: Academic Writing & Assignment Assistance");
  const b = encodeURIComponent(body || "Hello Kashaf Mustafa,\n\nI am contacting you regarding university assignment support.\n\nMy Requirements:\n");
  return `mailto:${email}?subject=${sub}&body=${b}`;
}
