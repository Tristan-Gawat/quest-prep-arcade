-- Messages table for real-time chat between friends
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast message queries
CREATE INDEX idx_messages_sender ON public.messages(sender_id, created_at DESC);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id, created_at DESC);
CREATE INDEX idx_messages_conversation ON public.messages(sender_id, receiver_id, created_at DESC);
CREATE INDEX idx_messages_unread ON public.messages(receiver_id, is_read) WHERE is_read = false;

-- Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages they sent or received
CREATE POLICY "Users can view their own messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can send messages (insert where they are the sender)
CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Users can mark messages as read (update only is_read on messages they received)
CREATE POLICY "Users can mark received messages as read"
  ON public.messages FOR UPDATE
  USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id);

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
