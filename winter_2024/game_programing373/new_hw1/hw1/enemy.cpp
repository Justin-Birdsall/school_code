#include "enemy.h"  
#include <iostream>
#include <string>

// main c++ file for enemy
Enemy::Enemy()
{
    name = "Anonymous E";
    hp = 100;
    speed = 1.5;
}

Enemy::Enemy(std::string, int, float)
{
    this->name = name;
    this->hp = hp;
    this->speed = speed;
}

void Enemy:: setName(std::string name )
{
    if(name.empty() == false && name.length() <= 25)  {this->name = name;}
    else{{std::string invalid_argument("Hp must be a non negative number");}}
}

void Enemy::setHp(int hp){
    if (hp>=0){this->hp = hp;}
    else {std::string invalid_argument("Hp must be a non negative number");}
}
void Enemy::setSpeed(float speed)
{

    if(speed <= 1.0  && speed>=0.0) {this->speed = speed;}
    else{throw std::invalid_argument("Speed has to be between values 0.0 and 1.0");}
}
//getter functions

std::string Enemy::getName() {return this-> name;}

int Enemy::getHp() {return this->hp;}

float Enemy::getSpeed(){return this->speed;}

bool Enemy::operator<(const Enemy &other) const{return this->hp <other.hp;}
bool Enemy::operator>(const Enemy &other) const { return this->hp > other.hp; }
bool Enemy::operator==(const Enemy &other) const {return !(this->hp < other.hp || this->hp > other.hp);}
std::ostream& operator<<(std::ostream& os, const Enemy& enemy) {
    os << enemy.getName() << ", " << enemy.getHp() << ", " << enemy.getSpeed();
    return os; 
} 