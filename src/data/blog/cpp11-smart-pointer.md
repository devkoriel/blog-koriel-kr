---
title: C++11 스마트 포인터
author: Jinsoo Heo
pubDatetime: 2017-10-28T17:37:01.000Z
modDatetime: 2022-07-28T15:10:43.000Z
draft: false
tags:
  - c++
  - c++11
ogImage: "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHNtYXJ0fGVufDB8fHx8MTY1OTAyMDk4MQ&ixlib=rb-1.2.1&q=80&w=2000"
description: "지금은 더 이상 사용하지 않는 스마트 포인터 std::auto_ptr가 C++11 이전에도 있었다. 하지만 몇가지 문제점이 있었는데, 배열의 포인터를 해제할 때 배열 객체가 모두 제대로 해제되지 않는다는 것과 복사 대입 연산시 실제로는 복사가 되지 않는 다는 것이었다. 후자는 상식..."
lang: ko
---

지금은 더 이상 사용하지 않는 스마트 포인터 `std::auto_ptr`가 C++11 이전에도 있었다. 하지만 몇가지 문제점이 있었는데, 배열의 포인터를 해제할 때 배열 객체가 모두 제대로 해제되지 않는다는 것과 복사 대입 연산시 실제로는 복사가 되지 않는 다는 것이었다. 후자는 상식적으로 잘 이해가 되지 않을 수도 있는데 C++98 표준에서는 복사로 이동을 대신했었다. 유식한 말로 복사 시맨틱이라고 하는데 이것이 개발자들을 상당히 곤란하게 만들었었다. 아래 코드를 좀 보자.

```cpp
#include <memory>

int main() {
    std::auto_ptr<int> foo(new int(3));
    
    std::auto_ptr<int> bar = foo; // 이때 foo는 null_ptr가 되어버린다.
    
    return 0;
}

```

`std::auto_ptr`의 복사 대입 연산자 함수 구현를 보았다면 이렇게 될 걸 예견할 수 있지만, 그렇지 않다면 그걸 미리 알기는 쉽지 않다.

이러한 문제점들을 보완하기 위해 C++11 표준에서는 새로운 스마트 포인터들이 포함됐다. 그리고 이동 시맨틱이 추가되었다. 이동 시맨틱은 객체를 복사하지 않고 이동시킨다. 이동 후에 객체의 소유권은 당연히 대입된 쪽이 가진다. 복사 시맨틱일 경우, STL 컨테이너 중 리스트나 벡터는 동적 배열이기 때문에 상황에 따라 그 메모리 크기가 두배까지 늘어난다. 그러고 나선 정작 원본은 해제시켜버린다. 이런 일련의 동작들이 메모리를 낭비하고 성능을 저하시키기 때문에 이동 시맨틱은 꼭 필요한 것이었다.

  

### 1\. unique\_ptr

C++11에선 `std::unique_ptr`라는 새로운 고유 포인터 타입을 도입했다. `std::auto_ptr`의 하위 호환이다. `std::unique_ptr`는 복사 생성자와 복사 대입 연산자가 아예 구현되어 있지 않다. 그렇기 때문에 복사가 애초에 불가능하고 이동만 가능하다. 이동은 `std::move()` 함수로만 가능하다. 포인터는 `get()` 멤버 함수로 얻을 수 있고 메모리 해제는 `reset()` 멤버 함수로 한다.

```cpp
#include <iostream>
#include <memory>

int main() {
    std::unique_ptr<int> foo(new int(3));
    
    // auto baz = foo; // 복사할 수 없다.
    auto bar = std::move(foo); // bar로 이동
    
    std::cout << foo.get() << std::endl; // null_ptr기 때문에 0 출력
    std::cout << bar.get() << std::endl;
    
    foo.reset(); // 이미 이동되었기 때문에 아무 동작도 수행되지 않는다.
    bar.reset(); // 메모리 해제
    
    return 0;
}

```

포인터를 복사할 수 없는거지 포인터가 가리키는 객체를 복사할 수 없는 것은 아니다. 또 복사 대입 연산시 좌항을 참조자로 선언하고 정의하는 것도 포인터의 포인터를 통해 참조하는 것이기 때문에 가능하다.

```cpp
#include <iostream>
#include <memory>

int main() {
    std::unique_ptr<int> foo(new int(3));
    
    auto bar = *foo;
    auto& baz = foo;
    
    // 포인터 출력
    std::cout << foo.get() << std::endl;
    std::cout << &bar << std::endl; // 컴파일러가 bar의 데이터 타입을 int로 추정
    std::cout << baz.get() << std::endl; // 참조자로 선언하고 정의했기 때문에 별 문제없이 출력된다.
    
    // 객체 출력
    std::cout << *foo << std::endl; // 3
    std::cout << bar << std::endl; // 3
    std::cout << *baz << std::endl; // 3
    
    return 0;
}

```

마지막으로 한가지 유의할 점이 있다. `const std::unique`로 선언된 포인터는 `std::move()`로도 이동시킬 수 없다. 비트 수준의 상수성을 가지고 있기 때문에 데이터를 다른 곳으로 이동을 시킬 수 없어서 그렇다.

```cpp
#include <memory>

int main() {
    const std::unique_ptr<int> foo(new int(3));
    
    auto bar = std::move(foo); // error: use of deleted function 'std::unique_ptr<_Tp, _Dp>::unique_ptr(const std::unique_ptr<_Tp, _Dp>&) [with _Tp = int; _Dp = std::default_delete<int>]'
    
    return 0;
}

```

  

### 2\. shared\_ptr

`std::shared_ptr`는 이름처럼 가리키는 객체의 소유권을 다른 포인터들과 공유할 수 있는 포인터다. `std::unique_ptr`과는 다르게 복사도 마음껏 할 수 있다. 같은 객체를 가리키는 `std::shared_ptr`은 레퍼런스 카운팅으로 추적된다. 참조된 횟수를 세는 것이므로 포인터가 복사될 때 마다 1씩 증가한다. 그리고 해제될 때 마다 1씩 감소한다. 포인터가 가리키는 객체의 메모리가 해제되는 시점은 레퍼런스 카운트가 0이 될 때이다. 레퍼런스 카운트는 `use_count()` 멤버 함수로 가져올 수 있다.

신기하게도 `std::shared_ptr` 객체가 복사되어도 메모리 공간은 늘어나지 않는다. 객체의 메모리 공간은 그대로 두고 앞서 이야기한대로 레퍼런스 카운트만 건드리기 때문에 그렇다.

```cpp
#include <iostream>
#include <memory>

int main() {
    std::shared_ptr<int> foo(new int(3)); // reference count = 1
    auto bar = foo; // reference count = 2
    
    std::cout << "reference count: " << bar.use_count() << std::endl;
    
    foo.reset(); // reference count = 1
    
    std::cout << "reference count: " << bar.use_count() << std::endl;
    
    bar.reset(); // reference count = 0, 이떄 객체가 완전히 해제된다.
    
    return 0;
}

```

레퍼런스 카운트가 0이 되어 참조하는 객체를 해제할 때 `std::shared_ptr`는 `delete` 연산자를 사용한다. 여기에 문제가 있다. 뭐가 문제냐고? `delete[]`는 사용하지 않는 것이 문제다.

```cpp
#include <memory>
#include <vector>

int main() {
    std::shared_ptr<int> foo(new int[1024]); // 이렇게 배열의 포인터를 선언하지 말고
    
    foo.reset();
    
    std::vector<std::shared_ptr<int>> bars; // 포인터 벡터를 만들면 해결된다.
    bars.push_back(std::shared_ptr<int>(new int(3)));
    
    for(auto& bar : bars) {
        bar.reset();
    }
}

```

이렇게 해결할 수도 있지만 전혀 섹시하지 않다. `std::shared_ptr`의 기본 생성자를 이용해서 해결하면 조금 더 섹시해질 수 있다. `std::shared_ptr`의 기본 생성자는 아래와 같이 정의되어 있다.

```cpp
constexpr shared_ptr() noexcept; // (1)

constexpr shared_ptr( std::nullptr_t ) noexcept; // (2)

template< class Y >
explicit shared_ptr( Y* ptr ); // (3)

template< class Y, class Deleter >
shared_ptr( Y* ptr, Deleter d ); // (4)

template< class Deleter >
shared_ptr( std::nullptr_t ptr, Deleter d ); // (5)

template< class Y, class Deleter, class Alloc >
shared_ptr( Y* ptr, Deleter d, Alloc alloc ); // (6)

```

4번째 기본 생성자를 보면 두번째 인자로 Deleter 함수 객체를 받고 있다. 여기에 우리가 원하는 Deleter 함수 객체를 넣어주면 `std::shared_ptr`가 그것으로 객체를 해제할 것이다.

```cpp
#include <memory>

template<typename T>
struct ArrayDeleter {
    void operator() (T* ptr) {
        delete[] ptr;
    }
};

int main() {
    std::shared_ptr<int> foo(new int[1024], ArrayDeleter<int>());
    
    foo.reset(); // 이제 배열도 제대로 해제될 것이다.
    
    return 0;
}

```

Deleter로 함수 객체가 아닌 lambda를 넘겨주어도 된다.

```cpp
#include <functional>
#include <memory>

template<typename T>
std::function<void (T*)> array_deleter() {
    return [](T* ptr) { delete[] ptr; };
}

int main()
{
    std::shared_ptr<int> foo(new int[1024], array_deleter<int>());
    
    foo.reset();
    
    return 0;
}

```

C++11 lambda는 template을 지원하지 않기 때문에 lambda를 반환하는 템플릿 함수를 정의하는 트릭을 썼다.

  

##### 참조 객체의 형변환

`static_pointer_cast<>()` 함수로 `std::shared_ptr`가 가리키는 객체의 형을 변환할 수 있다.

```cpp
#include <iostream>
#include <memory>

class Car {
};

class Sedan : public Car {
public:
    Sedan(int price) : price(price) {};
    void set_price(int price) { this->price = price; };
    int get_price() { return this->price; };

private:
    int price;
};

int main() {
    std::shared_ptr<Sedan> camry(new Sedan(3000));
    std::static_pointer_cast<Car>(camry);

    std::cout << camry.use_count() << std::endl; // 1

    auto _camry = std::static_pointer_cast<Sedan>(camry);

    std::cout << camry.use_count() << std::endl; // 2
}

```

  

##### shared\_ptr의 문제점

-   순환 참조

순환 참조는 보통 그룹 객체와 소속 객체 사이에 발생한다. 서로가 서로를 참조하고 있는 상황이기 때문에 메모리 해제가 제대로 안되는 상황이 발생한다.

-   멀티쓰레드 안정성

다수의 쓰레드에서 같은 각체를 참조하는 경우가 있을 수 있다. 이때 읽기는 안전하지만 쓰기는 안전하지 않다.

  

### 3\. weak\_ptr

`std::shared_ptr`가 참조하는 객체는 레퍼런스 카운트가 0이 되는 시점에 같이 해제된다고 했었다. 이러한 특징때문에 발생하는 심각한 문제가 있다. 두 클래스가 서로의 클래스 인스턴스 즉, 서로의 객체를 `std::shared_ptr`로 참조하고 있으면 두 객체 모두 영원히 `reset()` 멤버 함수로 해제될 수 없다. 이런 문제는 그룹 객체와 소속 객체 사이에서 자주 나타난다. 이럴 때 어느 한쪽에서 `std::shared_ptr`가 아닌 `std::weak_ptr`로 다른 객체를 참조하면 문제를 해결할 수 있다. `std::weak_ptr`은 객체의 레퍼런스 카운트에 포함되지 않기 때문에 가능한 일이다. 사실 객체의 참조는 강한 참조와 약한 참조로 나뉘는데 객체의 생명 주기에 관여하는 참조가 강한 참조이다. `std::weak_ptr`는 이름에서 알 수 있듯이 약한 참조이다. 따라서 `std::weak_ptr`을 통해서 멤버 변수나 함수에 접근할 수 없고 포인터에도 직접 접근할 수 없다.

`std::weak_ptr`의 기본 생성자, 복사 생성자, 복사 대입 연산자는 아래와 같다.

```cpp
// constructor
constexpr weak_ptr() noexcept;

weak_ptr( const weak_ptr& r ) noexcept;

template< class Y >
weak_ptr( const weak_ptr<Y>& r ) noexcept;

template< class Y >
weak_ptr( const std::shared_ptr<Y>& r ) noexcept;

weak_ptr( weak_ptr&& r ) noexcept;

template< class Y >
weak_ptr( weak_ptr<Y>&& r ) noexcept;

// operator=
weak_ptr& operator=( const weak_ptr& r ) noexcept;

template< class Y >
weak_ptr& operator=( const weak_ptr<Y>& r ) noexcept;

template< class Y >
weak_ptr& operator=( const shared_ptr<Y>& r ) noexcept;

weak_ptr& operator=( weak_ptr&& r ) noexcept;

template< class Y >
weak_ptr& operator=( weak_ptr<Y>&& r ) noexcept;

```

한번 쭉 보면 알 수 있듯이 같은 형 또는 `std::shared_ptr`의 객체만 그 인자로 받고 있다. 형 변환도 `std::shared_ptr`로만 가능하다. 그리고 `std::weak_ptr`은 포인터에 직접 접근을 할 수 없기 때문에 `lock()` 멤버 함수로 `std::shared_ptr` 객체를 생성한 다음 그 객체를 통해서 포인터에 접근해야 한다.

```cpp
#include <memory>

int main() {
    std::shared_ptr<int> foo(new int(3)); // reference count = 1
    std::weak_ptr<int> bar = foo; // reference count = 1
    
    {
        auto baz = bar.lock(); // reference count = 2
    } // 이 closure를 벗어나면서 baz는 해제된다. reference count = 1
    
    foo.reset(); // reference count = 0
    
    return 0;
}

```

아래는 `std::weak_ptr`를 이용해서 그룹 객체와 소속 객체의 순환 참조 문제를 해결한 예시이다.

```cpp
#include <memory>

class Tenant;

class Room {
public:
    Room() {}
    ~Room() { release_tenant(); }

    void set_tenant(const std::shared_ptr<Tenant>& tenant) {
        this->tenant = tenant;
    }

    void release_tenant() {
        this->tenant.reset();
    }

private:
    std::shared_ptr<Tenant> tenant;
};

class Tenant {
public:
    void set_room(const std::shared_ptr<Room>& room) {
        this->room = room;
    }

    void leave_room() {
        if(!this->room.expired()) {
            std::shared_ptr<Room> room = this->room.lock();

            if(room) {
                room->release_tenant();
            }
        }
    }
private:
    std::weak_ptr<Room> room;
};

int main() {
    /*
     * 아래 표시된 숫자들은 해당 객체의 레퍼런스 카운트
     */

    std::shared_ptr<Room> room(new Room()); // room: 1

    {
        std::shared_ptr<Tenant> tenant(new Tenant()); // room:1, tenant: 1

        room->set_tenant(tenant); // room: 1, tenant: 2
        tenant->set_room(room); // room: 1, tenant: 2
    } // room: 1, tenant: 1

    room.reset(); // room: 0, tenant: 0
}

```
