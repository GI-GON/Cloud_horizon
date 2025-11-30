export interface CloudConcept {
  id: string;
  title: string;
  description: string;
  iconName: 'Server' | 'Layers' | 'Box' | 'Zap' | 'Globe';
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
