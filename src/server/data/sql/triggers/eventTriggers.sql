CREATE OR REPLACE FUNCTION increment_score_on_goal()
RETURNS TRIGGER AS $$
BEGIN
  IF LOWER(NEW.name) = 'goal' THEN
    UPDATE "player_team"
    SET score = score + 1
    WHERE match_id = NEW.match_id AND team_color = (
      SELECT team_color FROM "player_team" WHERE player_id = NEW.player_id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER goal_event_trigger
AFTER INSERT ON "player_event"
FOR EACH ROW
EXECUTE FUNCTION increment_score_on_goal();
