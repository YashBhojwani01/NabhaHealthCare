import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Download,
  RefreshCw,
  Phone,
  MessageSquare,
  Pill,
  Plus
} from "lucide-react";

type OrderStatus = "pending" | "preparing" | "ready" | "out_for_delivery" | "completed" | "cancelled";

const PharmacistDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("orders");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const mockOrders = [
    {
      id: "ORD-1001",
      patientName: "Simran Kaur",
      items: ["Paracetamol 500mg", "Cetirizine 10mg"],
      amount: 145,
      status: "pending" as OrderStatus,
      createdAt: "2024-01-15 10:20 AM",
      notes: "Cash on pickup"
    },
    {
      id: "ORD-1002",
      patientName: "Harpreet Singh",
      items: ["Metformin 500mg"],
      amount: 45,
      status: "preparing" as OrderStatus,
      createdAt: "2024-01-15 10:45 AM",
      notes: "Diabetic patient"
    },
    {
      id: "ORD-1003",
      patientName: "Rajveer Singh",
      items: ["Amoxicillin 250mg"],
      amount: 85,
      status: "ready" as OrderStatus,
      createdAt: "2024-01-15 11:00 AM",
      notes: "Urgent"
    }
  ];

  const mockStock = [
    { id: 1, name: "Paracetamol 500mg", sku: "MED-PARA-500", quantity: 50, threshold: 20, price: 25, category: "Fever & Pain" },
    { id: 2, name: "Metformin 500mg", sku: "MED-METF-500", quantity: 12, threshold: 25, price: 45, category: "Diabetes" },
    { id: 3, name: "Amoxicillin 250mg", sku: "MED-AMOX-250", quantity: 5, threshold: 15, price: 85, category: "Antibiotics" },
    { id: 4, name: "Cetirizine 10mg", sku: "MED-CETI-010", quantity: 40, threshold: 20, price: 35, category: "Allergy" }
  ];

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((o) =>
      (statusFilter === "all" || o.status === statusFilter) &&
      (o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       o.patientName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [mockOrders, statusFilter, searchQuery]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending": return <Badge variant="secondary">Pending</Badge>;
      case "preparing": return <Badge variant="outline">Preparing</Badge>;
      case "ready": return <Badge className="bg-accent text-accent-foreground">Ready</Badge>;
      case "out_for_delivery": return <Badge variant="secondary">Out for delivery</Badge>;
      case "completed": return <Badge>Completed</Badge>;
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pharmacist Portal</h1>
            <p className="text-muted-foreground">Manage orders, stock, and pharmacy operations</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Stock</span>
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Suppliers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Incoming Orders</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by order id or patient name"
                        className="pl-9 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}> 
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="out_for_delivery">Out for delivery</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 rounded-lg border flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{order.id}</Badge>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="mt-2">
                        <p className="font-semibold">{order.patientName}</p>
                        <div className="text-sm text-muted-foreground">{order.items.join(", ")}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Placed: {order.createdAt}
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-lg font-semibold">₹{order.amount}</div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          SMS
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Ready
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stock" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Stock Management</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockStock.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Pill className="h-4 w-4 text-primary" />
                          <p className="font-semibold">{item.name}</p>
                          <Badge variant="outline" className="text-xs">{item.sku}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{item.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Price: ₹{item.price}</div>
                        <div className="text-sm">
                          Stock: <span className={item.quantity <= item.threshold ? "text-warning font-medium" : "font-medium"}>{item.quantity}</span>
                        </div>
                        {item.quantity <= item.threshold && (
                          <div className="text-xs text-warning flex items-center justify-end"><AlertTriangle className="h-3 w-3 mr-1" /> Low stock</div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <Button size="sm" variant="outline">Update</Button>
                      <Button size="sm">Restock</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                  Coming soon: Connect to supplier APIs for automated reordering and delivery tracking.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PharmacistDashboard;


