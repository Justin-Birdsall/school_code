//headerfile for enemy
#ifndef         __H__ENEMY__
#define         __H__ENEMY__

#include <string>

class Enemy {
    public:
        //Enemy() is a default constructor that
        //is setting its initial values
        Enemy();

        //constructor to take in the parameters that we want
        Enemy(std::string, int, float);
        //opperand overloading
        bool operator<(const Enemy& other) const;
        //Setters
        void setName(std::string);
        void setHp(int);
        void setSpeed(float);
        
        //Getters
        std::string getName();
        int getHp();
        float getSpeed();

    private:
        std::string name;
        int hp;
        float speed;
};

#endif
