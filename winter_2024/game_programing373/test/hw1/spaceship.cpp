/** spaceship.cpp **
 
#include "spaceship.h"
#include <iostream>
#include <string>
 
 
Spaceship::Spaceship(){
	name = "Anonymous Ship";
	hp = 100;
	shield = 1.0f;
}
 
 
Spaceship::Spaceship(std::string name, int hp, float shield){
	this->name = name;
	this->hp = hp;
	this->shield = shield;
}
 
 
void Spaceship::setName(std::string name){
	this->name = name;
}
 
 
void Spaceship::setHp(int hp){
	this->hp = hp;
}
 
 
void Spaceship::setShield(float shield){
	this->shield = shield;
}
 
 
std::string Spaceship::getName(){
	return this->name;
}
 
 
int Spaceship::getHp(){
	return this->hp;
}
 
 
float Spaceship::getShield(){
	return this->shield;
}
 
 
bool Spaceship::operator<(const Spaceship& other) const{
	return this->hp < other.hp;
}
