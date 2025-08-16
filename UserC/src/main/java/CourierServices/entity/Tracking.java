package CourierServices.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "tracking")
public class Tracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "courier_id", nullable = false)
    @JsonBackReference
    private Courier courier;

    @Column(unique = true, nullable = false)
    private String trackingId; // Store the same tracking ID
    
    @Column(nullable = false)
    private String currentLocation;

    public Tracking() {}

    public Tracking(Courier courier, String location) {
        this.courier = courier;
        this.trackingId=courier.getTrackingId();
        this.currentLocation = location;
    }

    
    public void setCourier(Courier courier) {
        this.courier = courier;
        this.trackingId = courier.getTrackingId(); 
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }
	public String getCurrentLocation() {
		return currentLocation;
	}

	public void setCurrentLocation(String currentLocation) {
		this.currentLocation = currentLocation;
	}

	public Courier getCourier() {
		return courier;
	}
	

	@Override
	public String toString() {
		return "Tracking [id=" + id + ", courier=" + courier + ", currentLocation=" + currentLocation + "]";
	}

}
