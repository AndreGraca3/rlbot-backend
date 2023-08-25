CREATE OR REPLACE FUNCTION increment_score_on_goal()
RETURNS TRIGGER AS $$
DECLARE
    team_color TEXT;
BEGIN
    IF LOWER(NEW.name) <> 'goal' AND LOWER(NEW.name) <> 'owngoal' THEN
        RETURN NEW;
    END IF;

    SELECT team INTO team_color
    FROM player_team
    WHERE player_id = NEW.player_id AND match_id = NEW.match_id
    ORDER BY created_at DESC
    LIMIT 1;

    IF LOWER(NEW.name) = 'goal' THEN
        IF team_color = 'BLUE' THEN
            UPDATE "match"
            SET blue_score = blue_score + 1
            WHERE id = NEW.match_id;
        ELSIF team_color = 'ORANGE' THEN
            UPDATE "match"
            SET orange_score = orange_score + 1
            WHERE id = NEW.match_id;
        END IF;
    ELSEIF LOWER(NEW.name) = 'owngoal' THEN
        IF team_color = 'BLUE' THEN
            UPDATE "match"
            SET orange_score = orange_score + 1
            WHERE id = NEW.match_id;
        ELSIF team_color = 'ORANGE' THEN
            UPDATE "match"
            SET blue_score = blue_score + 1
            WHERE id = NEW.match_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER goal_event_trigger
AFTER INSERT ON "player_event"
FOR EACH ROW
EXECUTE FUNCTION increment_score_on_goal();