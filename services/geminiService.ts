import { TopicContent } from "../types";
import { TOPIC_CONTENT_DATA } from "../constants";

// Fetches data immediately without any delay or promise timeout
export const getTopicContent = async (topicId: string): Promise<TopicContent | null> => {
  return Promise.resolve(TOPIC_CONTENT_DATA[topicId] || null);
};
