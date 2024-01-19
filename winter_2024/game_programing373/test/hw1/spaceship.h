/** spaceship.h **
 
#ifndef			__H__SPACESHIP__
#define			__H__SPACESHIP__
 
 
#include <string>
 
 
class Spaceship {
	public:
		// Spaceship() is a default constructor that sets
		// initial values to
		Spaceship();
 
 
		// Constructor that takes parameters 
		Spaceship(std::string, int, float);
 
 
		// Setters
		void setName(std::string);
		void setHp(int);
		void setShield(float);
 
 
		// Getters
		std::string getName();
		int getHp();
		float getShield();
 
 
		// Operators
		bool operator<(const Spaceship&) const;
 
 
	private:
		std::string name;
		int hp;
		float shield;
};
 
 
#endif
