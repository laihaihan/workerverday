package com.linewell.core.observer;

/**
 * 
 * <p>观察者实体BEAN</p>
 *   
 */
public class ObserverBean {
    
    private String classname;
    private String userable;
    
    public String getClassname() {
        return classname;
    }
    
    public String getUserable() {
        return userable;
    }
    
    public void setClassname(String classname) {
        this.classname = classname;
    }
    
    public void setUserable(String userable) {
        this.userable = userable;
    }
}