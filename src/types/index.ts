
export interface BusinessName {
  name: string;
  description: string;
  style: string;
  industry: string;
}

export interface GeneratorParams {
  description: string;
  industry: string;
  keywords: string[];
  audience: string;
  tone: string;
  style: string;
  location?: string;
  resultCount: number;
}
