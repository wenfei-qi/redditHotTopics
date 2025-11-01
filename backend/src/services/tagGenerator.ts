// Tag generation based on keywords in title and content
const TAG_KEYWORDS: Record<string, string[]> = {
  Technology: [
    'ai', 'artificial intelligence', 'machine learning', 'robot', 'tech', 'computer',
    'software', 'app', 'algorithm', 'code', 'programming', 'data', 'digital',
    'internet', 'website', 'cyber', 'bitcoin', 'crypto', 'blockchain', 'iphone',
    'android', 'phone', 'device', 'gadget', 'virtual reality', 'vr', 'ar',
  ],
  Science: [
    'science', 'physics', 'chemistry', 'biology', 'research', 'study', 'experiment',
    'theory', 'scientific', 'gene', 'dna', 'molecule', 'atom', 'quantum',
    'evolution', 'space', 'astronomy', 'planet', 'solar', 'universe',
  ],
  Health: [
    'health', 'medical', 'doctor', 'hospital', 'disease', 'medicine', 'treatment',
    'symptom', 'diagnosis', 'patient', 'therapy', 'drug', 'vaccine', 'mental health',
    'fitness', 'exercise', 'diet', 'nutrition', 'wellness', 'cancer', 'covid',
    'chemo', 'surgery', 'pain', 'injury',
  ],
  Politics: [
    'politic', 'government', 'president', 'election', 'vote', 'democracy',
    'republican', 'democrat', 'congress', 'senate', 'law', 'policy', 'trump',
    'biden', 'war', 'military', 'protest', 'rights', 'freedom',
  ],
  Business: [
    'business', 'company', 'economy', 'market', 'stock', 'money', 'finance',
    'investment', 'profit', 'sales', 'revenue', 'entrepreneur', 'startup',
    'corporate', 'ceo', 'trade', 'industry', 'commerce', 'bank', 'dollar',
  ],
  Entertainment: [
    'movie', 'film', 'tv', 'show', 'actor', 'actress', 'celebrity', 'music',
    'song', 'album', 'concert', 'band', 'netflix', 'disney', 'marvel', 'game',
    'video game', 'gaming', 'stream', 'youtube', 'podcast',
  ],
  Sports: [
    'sport', 'nba', 'nfl', 'mlb', 'soccer', 'football', 'basketball', 'baseball',
    'hockey', 'tennis', 'golf', 'olympics', 'championship', 'team', 'player',
    'coach', 'athlete', 'game', 'match', 'tournament',
  ],
  Food: [
    'food', 'cooking', 'recipe', 'restaurant', 'meal', 'eat', 'drink', 'cuisine',
    'chef', 'dish', 'flavor', 'taste', 'coffee', 'wine', 'beer', 'dessert',
    'breakfast', 'lunch', 'dinner', 'soda', 'bottle', 'can',
  ],
  Education: [
    'education', 'school', 'college', 'university', 'student', 'teacher',
    'professor', 'learning', 'study', 'class', 'course', 'degree', 'exam',
    'homework', 'grade', 'academic',
  ],
  Work: [
    'work', 'job', 'career', 'employee', 'employer', 'salary', 'wage', 'hire',
    'office', 'remote', 'meeting', 'project', 'deadline', 'promotion',
    'interview', 'resume', 'professional', 'workplace', 'overtime', 'paid',
    'christmas', 'holiday',
  ],
  Lifestyle: [
    'life', 'lifestyle', 'personal', 'home', 'family', 'parent', 'child', 'kid',
    'marriage', 'relationship', 'friend', 'social', 'hobby', 'travel', 'vacation',
    'house', 'apartment', 'rent', 'buy',
  ],
  Psychology: [
    'psychology', 'mind', 'brain', 'mental', 'emotion', 'behavior', 'think',
    'feel', 'personality', 'anxiety', 'depression', 'stress', 'therapy',
    'cognitive', 'consciousness',
  ],
  Nature: [
    'nature', 'environment', 'climate', 'weather', 'animal', 'plant', 'tree',
    'ocean', 'sea', 'forest', 'wildlife', 'species', 'ecosystem', 'earth',
    'green', 'sustainable', 'pollution', 'bird', 'dog', 'cat',
  ],
  Mystery: [
    'why', 'how', 'what', 'mystery', 'strange', 'weird', 'unknown', 'curious',
    'explain', 'understand', 'question',
  ],
  Discussion: [
    'discussion', 'debate', 'opinion', 'think', 'believe', 'agree', 'disagree',
    'argument', 'perspective', 'view',
  ],
};

export function generateTags(title: string, content: string): string[] {
  const text = `${title} ${content}`.toLowerCase();
  const foundTags = new Set<string>();

  // Check each tag category
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        foundTags.add(tag);
        break; // Found a match for this tag, move to next tag
      }
    }
  }

  // If it's a question, add Question tag
  if (title.includes('?') || title.toLowerCase().startsWith('why ') ||
      title.toLowerCase().startsWith('how ') || title.toLowerCase().startsWith('what ')) {
    foundTags.add('Question');
  }

  // If no tags found, add General
  if (foundTags.size === 0) {
    foundTags.add('General');
  }

  // Limit to 5 most relevant tags
  return Array.from(foundTags).slice(0, 5);
}
