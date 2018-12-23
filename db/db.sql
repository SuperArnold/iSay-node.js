CREATE TABLE IF NOT EXISTS member(
    ID  SERIAL PRIMARY KEY,
    username VARCHAR(20),
    account VARCHAR(50),
    account VARCHAR(50),
    Type int
);


CREATE TABLE IF NOT EXISTS test_user(
    me_ID SERIAL references member(id), 
    birthday date,
    gender int,
    info VARCHAR(200),
    membership int,
    capacity int,
    id_number varchar(10)
);